import React, { Component, ChangeEvent } from "react";
import "./add-product.css";
import { ProductModel } from "./models/product-model";
import axios from "axios";

interface AddProductState {
  product: ProductModel;
  preview: string;
}

export class AddProduct extends Component<any, AddProductState> {
  private fileInput: HTMLInputElement;

  public constructor(props: any) {
    super(props);
    this.state = {
      product: new ProductModel(),
      preview: ""
    };
  }

  public render() {
    return (
      <div className="add-product">
        <h2>Add Product</h2>

        <input
          type="name"
          onChange={this.setName}
          value={this.state.product.name || ""}
          placeholder="Name..."
        />
        <br />
        <br />

        <input
          type="number"
          onChange={this.setPrice}
          value={this.state.product.price || ""}
          placeholder="Price..."
        />
        <br />
        <br />

        <input
          type="number"
          onChange={this.setStock}
          value={this.state.product.stock || ""}
          placeholder="Stock..."
        />
        <br />
        <br />

        <input
          type="file"
          onChange={this.setImage}
          accept="image/*"
          ref={fi => (this.fileInput = fi)}
        />
        <button type="button" onClick={() => this.fileInput.click()}>
          Select Product Image
        </button>
        <br />
        <br />

        <img src={this.state.preview} />
        <br />
        <br />

        <button type="button" onClick={this.addProduct}>
          Add Product
        </button>
      </div>
    );
  }

  private setName = (args: ChangeEvent<HTMLInputElement>) => {
    const name = args.target.value;
    const product = { ...this.state.product };
    product.name = name;
    this.setState({ product });
  };

  private setPrice = (args: ChangeEvent<HTMLInputElement>) => {
    const price = +args.target.value;
    const product = { ...this.state.product };
    product.price = price;
    this.setState({ product });
  };

  private setStock = (args: ChangeEvent<HTMLInputElement>) => {
    const stock = +args.target.value;
    const product = { ...this.state.product };
    product.stock = stock;
    this.setState({ product });
  };

  private setImage = (args: ChangeEvent<HTMLInputElement>) => {
    const image = args.target.files[0];
    const product = { ...this.state.product };
    product.image = image;
    console.log(product);
    this.setState({ product });

    // Display image on client:
    var reader = new FileReader();
    reader.onload = event =>
      this.setState({ preview: event.target.result.toString() });
    reader.readAsDataURL(image); // Read the image.
  };

  private addProduct = async () => {
    const myFormData = new FormData();
    myFormData.append("name", this.state.product.name);
    myFormData.append("price", this.state.product.price.toString()); // Can't send number.
    myFormData.append("stock", this.state.product.stock.toString());
    myFormData.append(
      "image",
      this.state.product.image,
      this.state.product.image.name
    );

    const response = await axios.post<ProductModel>(
      "http://localhost:3012/api/auth/file",
      myFormData
    );
    const product = response.data;
    console.log(product);

    alert("Done.");

    this.setState({ product: new ProductModel(), preview: "" });
  };
}

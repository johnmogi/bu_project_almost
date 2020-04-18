export class newFileVacModel {
    public constructor(
        public destination?: string,
        public description?: string,
        public price?: string,
        public startDate?: string | Date,
        public endDate?: string | Date,
        public picFileName?: string,
        public imageFileUpload?: File) { }
}


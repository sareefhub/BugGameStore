interface PointData {
    id: number;
    attributes: {
      Date: string;
      price: number;
      QRImage?: {
        data: {
          id: number;
          attributes: {
            qrImage: any;
            name: string;
            url: string;
          };
        }[];
      };
    };
  }

export default PointData;
interface PointData {
    id: number;
    attributes: {
      Date: string;
      price: number;
      QRImage?: {
        data: {
          id: number;
          attributes: {
            name: string;
            url: string;
          };
        }[];
      };
    };
  }

export default PointData;
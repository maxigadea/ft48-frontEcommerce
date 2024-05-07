export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginErrorProps {
    email?: string;
    password?: string;
}

export interface userSession {
    token: string;
    userData: {
      address: string;
      email: string;
      id: number;
      name: string;
      phone: string;
      role: string;
      orders: []
    }
}

export interface IOrder {
    id: number;
    date: Date;
    status: string;
    products: IProduct[];
}
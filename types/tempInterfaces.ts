import { EntityStatus } from "./jobs.enums";

export interface BaseEntity {
	userId: String;
	status: EntityStatus;
	nickname: string;
}

export interface IOrder {
	Id: number;
	TotalPrice: number;
	Products: { sku: string; Qty: number }[];
	IsSelfDelivery: boolean;
	Email: string;
	Phone: string;
	City: string;
	Address: string;
	StreetNameAndNumber: string;
	ApartmentNumber: string;
	FloorNumber: string;
	FirstName: string;
	LastName: string;
	LastDigits: string;
	OrderDate: string;
	//#TODO: create generic order interface
	//       that can implement priority order for now
}

export interface ISellerOrder {
	LastDigits: string;
	TotalPrice: number;
	OrderDate: string;
}

export interface IClientFilters {
	userId: string;
	_id: string;
}

export interface ILoadExcel<Product = any> {
	products: Product[];
	userId: string;
}

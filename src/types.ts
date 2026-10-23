export type Products = {
  productId: number;
  productName: string;
  quantityPerUnit: string;
  unitPrice: number;
  unitsInStock: number;
  unitsOnOrder: number;
};
export type  Suppliers = {
  supplierId: number;
  companyName: string;
  contactName: string | null;
  city: string | null;
  country: string | null;
};
export type ProductDetails = {
  productId: number;
  productName: string;
  supplierId: number | null;
  supplierName: string | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
  discontinued: number;
};

export type SupplierDetails = {
  supplierId: number;
  companyName: string;
  contactName: string | null;
  contactTitle: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  fax: string | null;
  homePage: string | null;
};
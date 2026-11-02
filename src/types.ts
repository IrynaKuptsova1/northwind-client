export type Products = {
  productId: number;
  productName: string | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
};
export type Customers = {
  customerId: string;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  city: string | null;
  country: string | null;
};

export type CustomerDetails = {
  customerId: string;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  fax: string | null;
};
export type Suppliers = {
  supplierId: number;
  companyName: string | null;
  contactName: string | null;
  contactTitle: string | null;
  city: string | null;
  country: string | null;
};
export type ProductDetails = {
  productId: number;
  productName: string | null;
  supplierId: number | null;
  supplierName: string | null;
  quantityPerUnit: string | null;
  unitPrice: number | null;
  unitsInStock: number | null;
  unitsOnOrder: number | null;
  reorderLevel: number | null;
  discontinued: number | null;
};

export type SupplierDetails = {
  supplierId: number;
  companyName: string | null;
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

export type Employee = {
  employeeId: number;
  name: string | null;
  title: string | null;
  city: string | null;
  phone: string | null;
  country: string | null;
};

export type EmployeeDetails = {
  employeeId: number;
  lastName: string | null;
  firstName: string | null;
  title: string | null;
  titleOfCourtesy: string | null;
  birthDate: string | null;
  hireDate: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  homePhone: string | null;
  extension: string | null;
  notes: string | null;
  reportsTo: number | null;
};

import { api } from "@/lib/axiosInstances";

export interface RequestInformation {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  email: string;
  mobileNo: string;
  productFamily: string,
  productName: string,
  enquireType: string,
  request: string,
}

export interface CreateRequestInformationPayload {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  email: string;
  mobileNo: string;
  productFamily: string;
  productName: string;
  enquireType: string;
  request: string;
}

export interface RequestInformationListResponse {

  data : RequestInformation[],
  pagination: {
    page : number,
    limit : number,
    total : number,
    totalPages : number,
    hasNextPage : boolean,
    hasPreviousPage : boolean,
  };
total: number;
}

export const getRequestInfo = async ( page: number,  limit: number ): Promise<RequestInformationListResponse> => {
  const response = await api.get("/api/website/requestInformation", { params : {page, limit} });
  return response.data.data;
};

export const getRequestInformationById = async (
  id: string,
): Promise<RequestInformation> => {
  const response = await api.get(`/api/website/requestInformation/${id}`);

  return response.data.data;
};

export const createRequestInformation = async (
  data: CreateRequestInformationPayload,
): Promise<RequestInformation> => {
  const response = await api.post("/api/website/requestInformation", data);

  return response.data.data;
};

export const updateRequestInformation = async ({ id, data }: {
  id: string;
  data: CreateRequestInformationPayload;
}): Promise<RequestInformation> => {
  const response = await api.put(`/api/website/requestInformation/${id}`, data);

  return response.data.data;
};

export const deleteRequestInformation= async (
  id: string,
): Promise<void> => {
  await api.delete(`/api/website/requestInformation/${id}`);
};
export interface Location {
  _id?: string;
  province: string;
  district: string;
  municipality: string;
  wardNumber: number;
  pollingCenter: string;
  hoRConstituency?: number;
  provincialConstituency?: number;
}

export interface Voter {
  _id: string;
  serial_no: number;
  voter_id: number;
  full_name: string;
  age: number;
  gender: string;
  parent_name: string;
  spouse_name?: string | null;
  location: Location;
}

export interface indivusialVoterData {
  _id: string;
  voter_id: number;
  full_name: string;
  age: number;
  gender: string;
  parent_name: string;
  spouse_name?: string;
  location: {
    province: string;
    district: string;
    municipality: string;
    wardNumber: number;
    pollingCenter: string;
  };
}

export interface VoterResponse {
  success: boolean;
  data: Voter[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    totalPages: number;
  };
}

// shared/types.ts
export interface FormData {
    name: string;
    nationality: string;
    age: number;
    fieldOfStudy: string;
    gender: string | null;
    phoneNumber: string | undefined;
}


export interface PropertyDetails {
    id: string;
    title: string;
    accommodationType: string;
    type: string;
    address: string;
    size: number;
    room: number;
    bathroom: number;
    tenants: number;
    rent: number;
    parking: string;
    internet: string;
    furnish: string;
    billsIncluded: boolean;
    bond: number;
    dateAvailability: Date;
    min: string;
    max: string;
    image: string[];
    description: string;
    accepting: any[];
    features: any[];
    overview: any[];
    facilities: Record<string, any>;
    phoneNumber: string;
    userEmail?: string;
}

export interface TenantRandom extends TenantFormData {
    category: "tenant";
    title: string;
}

export interface PropertyRandom extends PropertyDetails {
    category: "property";
    title: string;
}


export interface GroupMember {
    id: number;
    name?: string;
    nationality?: string;
    gender?: string | null;
}

export interface TenantFormData {
    id: string;
    name: string;
    nationality: string;
    fieldOfStudy: string;
    gender: string;
    introduction: string;
    partnerName: string;
    partnerGender: string;
    partnerNationality: string;
    partnerFieldOfStudy: string;
    groupMembers: GroupMember[];
    monthlyBudget: number;
    preferredMoveDate: Date;
    maxFlatmates: string;
    parking: string;
    image: string[];
    location: string;
    placeType: string;
    age: number;
    details: any[];
    preference: string;
    max: string;
    phoneNumber: string;
    userEmail?: string;
}

export interface ItemFormData {
    id: string;
    createdAt: Date;
    image: string[];
    title: string;
    price: number;
    condition?: string;
    address: string;
    description: string;
}

export interface RandomItem {
    category: "tenant" | "property";
    title: string;
}
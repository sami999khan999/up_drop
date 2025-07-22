export interface NewUserType {
  clerkId: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export interface UpdateUserType {
  name?: string | null;
  imageUrl?: string | null;
}

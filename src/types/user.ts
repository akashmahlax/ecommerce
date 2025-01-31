export interface User {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
  }
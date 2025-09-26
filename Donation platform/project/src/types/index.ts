export interface User {
  id: string;
  email: string;
  name: string;
  role: 'donor' | 'organization';
  avatar?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  image_url: string;
  organization_id: string;
  organization_name: string;
  category: string;
  status: 'active' | 'completed' | 'paused';
  end_date: string;
  created_at: string;
  beneficiaries?: Beneficiary[];
}

export interface Beneficiary {
  id: string;
  name: string;
  story: string;
  image_url: string;
  age?: number;
  location: string;
}

export interface Donation {
  id: string;
  amount: number;
  campaign_id: string;
  campaign_title: string;
  donor_id: string;
  donor_name: string;
  message?: string;
  payment_method: string;
  receipt_url: string;
  created_at: string;
}

export interface Receipt {
  id: string;
  donation_id: string;
  receipt_number: string;
  amount: number;
  campaign_title: string;
  date: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
}
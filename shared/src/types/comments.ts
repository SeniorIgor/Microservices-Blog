export interface Comment {
  id: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Connection {
  name: string;
  role: string;
  imageUrl: string;
  connectionStrength: number;
  lastInteraction: string;
}

export interface ConnectionCardProps extends Connection {} 
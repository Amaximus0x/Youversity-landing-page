export interface KlaviyoProfile {
  type: "profile";
  attributes: {
    email: string;
    properties?: Record<string, any>;
  };
} 
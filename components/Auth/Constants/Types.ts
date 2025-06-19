interface FormState {
  error?: string;
  success?: boolean;
  data?:{
    email:string;
    password:string;
    full_name?:string;
  }
};

interface WrapperProps {
  children: React.ReactNode;
}
import { AuthWrapper } from '@/components/Auth/AuthWrapper';
import { RegisterComp } from '@/components/Auth/Register/RegisterComp';

export default function RegisterPage() {
  return (
    <AuthWrapper>
    <RegisterComp/>
    </AuthWrapper>
  );
}

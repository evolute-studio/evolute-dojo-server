import NewAdminPanel from './components/NewAdminPanel';
import ProtectedLayout from './components/ProtectedLayout';

export default function Home() {
  return (
    <ProtectedLayout>
      <NewAdminPanel />
    </ProtectedLayout>
  );
}
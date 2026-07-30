import { motion } from 'framer-motion';
import { RegisterForm } from '@/components/ui/RegisterForm';

export default function CreateAccount() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
}

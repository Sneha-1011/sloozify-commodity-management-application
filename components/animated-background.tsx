'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 animate-gradient" />
      
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-orb-float-1" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-orb-float-2" />
      <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-orb-float-3" />
      <div className="absolute bottom-40 right-40 w-64 h-64 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-full mix-blend-multiply filter blur-3xl animate-orb-float-1" />
      
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full mix-blend-screen filter blur-2xl animate-orb-float-2 [animation-delay:-5s]" />
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-gradient-to-r from-indigo-500/25 to-violet-500/25 rounded-full mix-blend-multiply filter blur-3xl animate-orb-float-3 [animation-delay:-10s]" />
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
}

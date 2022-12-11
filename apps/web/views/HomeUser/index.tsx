import Background from "./components/Background";
import TodoApp from "./components/TodoApp";

const Homepage: React.FC = () => {
  return (
    <main className="w-full h-screen bg-slate-900">
      <Background />
      <section className="">
        <h1 className="text-5xl text-white">TODO</h1>
        <TodoApp />
      </section>
    </main>
  );
};

export default Homepage;

import EmedsHeader from './components/Header';
import Windows from './components/Windows';

const Emeds = () => {
  return (
    <section id="emeds" className="mt-24 lg:mt-96">
      <EmedsHeader />

      <div className="h-[250vh]">
        <Windows windowLength={1.5} />
      </div>
    </section>
  );
};

export default Emeds;

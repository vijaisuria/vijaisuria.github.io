import Game from './components/Game';
import TohHeader from './components/Header';

const Toh = () => {
  return (
    <section className="mt-24" id="toh">
      <TohHeader />

      <div className="h-[140vh]">
        <Game />
      </div>
    </section>
  );
};

export default Toh;

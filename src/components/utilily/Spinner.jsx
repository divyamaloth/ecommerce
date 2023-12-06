import loading from "../../assets/spinner/loading.gif";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={loading} alt="" className="w-20 h-20" />
    </div>
  );
};

export default Spinner;

type Props = {
  borderColor: string;
  text?: string;
};

function Loader({ borderColor, text }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid ${borderColor} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      />
      <h2>{text}</h2>
    </div>
  );
}

export default Loader;

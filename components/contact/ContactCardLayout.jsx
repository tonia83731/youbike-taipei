export default function ContactCardLayout(props) {
  const { children } = props;
  return (
    <div className="w-full h-full bg-white shadow-md px-2 py-1">{children}</div>
  );
}

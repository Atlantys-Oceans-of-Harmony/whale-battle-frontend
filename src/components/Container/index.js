const Container = ({ active, children }) => {
  return (
    <div>
      <div className="section justfiy-center text-center mt-10 flex justify-between border-b border-red">
        {children}
      </div>
    </div>
  );
};
export default Container;

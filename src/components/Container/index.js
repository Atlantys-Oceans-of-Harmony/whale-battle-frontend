const Container = ({ active, children }) => {
  return (
    <div>
      <div className="section justfiy-center text-center mx-12 xl:mx-48 mt-10 flex justify-between border-b border-red">
        {children}
      </div>
    </div>
  );
};
export default Container;

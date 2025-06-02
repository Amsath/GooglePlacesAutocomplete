const withLogger = (Component) => {
  return (props) => {
    console.log('Rendering component:', Component.name);
    return <Component {...props} />;
  };
};

export default withLogger;

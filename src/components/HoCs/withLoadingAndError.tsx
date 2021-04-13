import React from "react";
import Spinner from "../spinner";

interface Props {
  loading: boolean;
  error?: string;
}

const withLoadingAndError = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithLoading extends React.Component<P & Props> {
    render() {
      const { loading, error, ...props } = this.props;
      if (error && error !== "") {
        return (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        );
      } else {
        return loading ? <Spinner /> : <Component {...(props as P)} />;
      }
    }
  };
export default withLoadingAndError;

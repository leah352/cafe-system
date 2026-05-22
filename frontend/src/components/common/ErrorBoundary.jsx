import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught error', error, info);
    }
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{padding:20, borderRadius:8, background:'var(--panel)', color:'var(--text-dark)'}}>
          <strong>Something went wrong.</strong>
          <div style={{marginTop:8}}>
            <button onClick={this.reset} style={{marginTop:8, padding:'8px 12px', borderRadius:6, background:'var(--accent-warm)', border:'none', cursor:'pointer', color:'var(--panel-contrast)'}}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

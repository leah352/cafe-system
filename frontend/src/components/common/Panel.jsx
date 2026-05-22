import React, { useState } from 'react';

const sanitizeId = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const Panel = ({ title, id, defaultOpen = true, children }) => {
  const panelId = id || `panel-${sanitizeId(title || 'panel')}`;
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="panel leaxie-panel" data-open={open}>
      <div className="panel-header">
        <button
          aria-expanded={open}
          aria-controls={panelId}
          className="panel-toggle"
          onClick={() => setOpen(o => !o)}
          type="button"
        >
          <span className="panel-title">{title}</span>
          <span aria-hidden className="panel-caret">{open ? '▾' : '▸'}</span>
        </button>
      </div>

      <div id={panelId} className="panel-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
};

export default Panel;

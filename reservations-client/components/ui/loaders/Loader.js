import React from 'react'

const Loader = ({ color }) => {
  return (
    <div className="Loader">
      <style jsx>{`
        .Loader {
          background-color: ${color ? color : '#3f6ad8'};
          width: 15px;
          height: 15px;
          border-radius: 100%;
          margin: 2px;
          animation-fill-mode: both;
          border: 2px solid ${color ? color : '#3f6ad8'};
          border-bottom-color: transparent;
          height: 25px;
          width: 25px;
          background: transparent !important;
          display: inline-block;
          animation: rotate 0.75s 0s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(0.6);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Loader

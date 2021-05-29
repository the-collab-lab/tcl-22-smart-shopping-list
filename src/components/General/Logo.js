import React, { useLayoutEffect, useRef } from 'react';

const Logo = ({ type }) => {
  const outline = useRef(null);
  const cap = useRef(null);
  const body = useRef(null);
  const face = useRef(null);

  useLayoutEffect(() => {
    let interval;

    if (type === 'animated') {
      outline.current.setAttribute('stroke-dashoffset', '275');
      cap.current.setAttribute('stroke', 'none');
      face.current.setAttribute('stroke', 'none');
      body.current.setAttribute('fill', 'none');

      let count = 274;
      interval = setInterval(() => {
        outline.current.setAttribute('stroke-dashoffset', count);
        console.log('interval running');
        count--;
        if (count === 274 / 2) {
          cap.current.setAttribute('stroke', '#A6CF93');
        }
        if (count === 0) {
          setTimeout(() => {
            body.current.setAttribute('fill', '#FAFAF9');
          }, 200);
          setTimeout(() => {
            face.current.setAttribute('stroke', '#A6CF93');
          }, 600);
        }
        return count === 0 && clearInterval(interval);
      }, 5);
    }

    return () => clearInterval(interval);
  }, [type]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="auto"
      fill="none"
      viewBox="0 0 352 118"
      aria-labelledby="title"
    >
      <title id="title" lang="en">
        AvoCart logo: a smiling avocado
      </title>
      <path
        ref={outline}
        className="outline"
        stroke="#A6CF93"
        strokeLinecap="round"
        strokeWidth="12"
        d="M176.365 111.045c-25.135 0-40.208-20.078-36.142-40.479 2.447-12.275 4.847-22.874 7.716-31.735 2.879-8.893 6.1-15.605 9.963-20.361 4.883-6.014 11.832-8.007 15.945-8.637a24.263 24.263 0 012.01-.227 13.486 13.486 0 01.508-.026s0 0 0 0c.053.002.157.005.307.014.301.016.781.052 1.404.128 3.856.472 11.498 2.278 16.752 8.748 3.862 4.757 7.083 11.469 9.963 20.361 2.869 8.861 5.269 19.46 7.715 31.735 4.067 20.401-11.006 40.479-36.141 40.479z"
      />
      <path
        ref={cap}
        className="cap"
        stroke="#A6CF93"
        strokeLinecap="round"
        strokeWidth="4"
        d="M175.027 2.161c.046-.05.095-.095.145-.133.144-.109.384-.228.829-.228.46 0 .709.119.854.225.037.027.074.058.109.092l-1.937.044z"
      />
      <path
        ref={body}
        fill="#FAFAF9"
        d="M176.366 110.873c-24.125 0-39.44-20.753-35.356-42.409 4.084-21.655 8.18-38.347 15.806-48.273 5.28-6.872 12.621-8.986 16.638-9.636 0 0 1.411-.289 2.412-.289 1 0 2.579.167 2.579.167 3.754.486 11.801 2.379 17.471 9.758 7.626 9.926 11.722 26.618 15.806 48.273 4.084 21.656-11.23 42.409-35.356 42.409z"
      />
      <path
        ref={face}
        stroke="#A6CF93"
        strokeLinecap="round"
        strokeWidth="2.5"
        d="M163.7 33s-.075 3.593 4.182 3.593c4.257 0 3.8-3.593 3.8-3.593M189.002 33s.076 3.593-4.181 3.593-3.8-3.593-3.8-3.593M172.5 42s1.05 1.54 3.501 1.54c2.451 0 3.502-1.54 3.502-1.54"
      />
      <path
        fill="#DC9600"
        d="M154.912 87.868a23.943 23.943 0 01-1.692-8.883c.022-9.478 5.692-18.446 15.022-22.215 12.294-4.968 26.288.972 31.255 13.267l-8.348 3.372c-3.105-7.684-11.85-11.396-19.534-8.291-5.851 2.363-9.399 7.998-9.389 13.944a15.044 15.044 0 001.016 5.387l.081.203a14.956 14.956 0 008.049 8.191c7.629 3.238 16.438-.32 19.677-7.95l8.287 3.519c-5.181 12.205-19.276 17.9-31.481 12.719a23.937 23.937 0 01-12.943-13.263zM245.7 102.994c-2.63 0-5.005-.318-7.126-.955-2.121-.678-3.818-1.802-5.09-3.372-1.273-1.612-1.909-3.838-1.909-6.68 0-2.97.933-5.345 2.8-7.126 1.866-1.824 4.772-2.736 8.716-2.736 1.654 0 3.245.212 4.772.636 1.569.424 2.906.933 4.008 1.527v-2.036c0-1.951-.636-3.35-1.908-4.2-1.23-.89-2.969-1.335-5.218-1.335-1.908 0-3.817.34-5.726 1.018-1.908.636-3.414 1.42-4.517 2.354V71.69c1.018-.68 2.693-1.316 5.026-1.91 2.376-.593 4.984-.89 7.826-.89 1.23 0 2.63.148 4.199.445a14.38 14.38 0 014.645 1.591c1.484.763 2.693 1.887 3.627 3.372.975 1.485 1.463 3.436 1.463 5.853l-.064 15.207c-.042 2.757-1.421 4.729-4.135 5.917-2.715 1.145-6.511 1.718-11.389 1.718zm-4.708-10.816c0 1.272.509 2.29 1.527 3.053a6.088 6.088 0 003.499 1.082c2.163 0 3.669-.148 4.517-.445.891-.297 1.336-.89 1.336-1.782v-4.962c-1.527-.51-3.16-.764-4.899-.764-3.987 0-5.98 1.273-5.98 3.818zM287.701 102.039V73.217c.593-.466 1.654-1.039 3.181-1.717 1.527-.68 3.266-1.273 5.217-1.782a22.349 22.349 0 015.981-.827c1.993 0 3.563.148 4.708.445 1.145.297 2.015.679 2.609 1.146v6.935c-.976-.212-2.248-.36-3.818-.446a58.125 58.125 0 00-4.708-.063c-1.527 0-2.757.085-3.69.254v24.877h-9.48zM346.083 103.312c-3.733 0-6.511-.87-8.335-2.609-1.824-1.781-2.736-4.284-2.736-7.507V77.099h-4.708v-7.254h4.708v-8.843h9.925v8.843H352V77.1h-7.063v14.888c0 1.103.234 1.93.7 2.481.467.509 1.252.763 2.354.763A6.515 6.515 0 00352 93.895v8.081a9.26 9.26 0 01-2.927 1.018 14.646 14.646 0 01-2.99.318z"
      />
      <path
        fill="#FFC344"
        d="M14.125 102.994c-2.63 0-5.005-.318-7.126-.955-2.121-.678-3.818-1.802-5.09-3.372C.636 97.055 0 94.83 0 91.987c0-2.97.933-5.345 2.8-7.126 1.866-1.824 4.771-2.736 8.716-2.736 1.654 0 3.245.212 4.772.636 1.57.424 2.905.933 4.008 1.527v-2.036c0-1.951-.636-3.35-1.909-4.2-1.23-.89-2.969-1.335-5.217-1.335-1.909 0-3.817.34-5.726 1.018-1.909.636-3.414 1.42-4.517 2.354V71.69c1.018-.68 2.693-1.315 5.026-1.91 2.375-.593 4.984-.89 7.826-.89 1.23 0 2.63.148 4.2.445 1.61.255 3.16.785 4.644 1.591 1.484.763 2.693 1.887 3.626 3.372.976 1.485 1.464 3.436 1.464 5.853l-.064 15.207c-.042 2.757-1.42 4.729-4.136 5.917-2.714 1.145-6.51 1.718-11.388 1.718zM9.416 92.178c0 1.272.51 2.29 1.527 3.054a6.092 6.092 0 003.5 1.081c2.163 0 3.669-.148 4.517-.445.89-.297 1.336-.89 1.336-1.782v-4.962c-1.527-.51-3.16-.764-4.899-.764-3.987 0-5.98 1.273-5.98 3.818zM57.016 102.039L43.59 69.845h10.243l8.526 21.76 7.571-21.76h9.99L66.495 102.04h-9.48zM108.232 102.994c-10.901 0-16.33-5.727-16.288-17.179 0-6.065 1.378-10.413 4.135-13.043 2.757-2.672 6.808-4.008 12.153-4.008 5.387 0 9.48 1.378 12.279 4.135 2.8 2.715 4.199 7.02 4.199 12.916 0 5.642-1.421 9.925-4.262 12.852-2.842 2.885-6.914 4.327-12.216 4.327zm0-7.572c2.333 0 4.093-.805 5.28-2.417 1.188-1.654 1.782-4.051 1.782-7.19 0-3.563-.615-6.044-1.845-7.444-1.188-1.4-2.927-2.1-5.217-2.1-2.418 0-4.178.722-5.281 2.164-1.103 1.442-1.654 3.902-1.654 7.38 0 3.224.551 5.642 1.654 7.253 1.145 1.57 2.905 2.354 5.281 2.354z"
      />
    </svg>
  );
};

export default Logo;

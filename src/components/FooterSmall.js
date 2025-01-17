import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? " w-full bottom-0 bg-gray-900"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-1">
              <div className="text-sm text-white font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-white hover:text-gray-400 text-sm font-semibold py-1"
                >
                  Astra Graphia IT
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

import { useState, useEffect } from "react";

function Dynamicfile() {
  const [scriptSrc, setScriptSrc] = useState("");

  useEffect(() => {
    const divElements = document.querySelectorAll('[attribute-gallery]');

    divElements.forEach((div) => {
      const id = div.getAttribute('attribute-gallery');
      const textValue = `ID : ${id} - Hello`;

      const textNode = document.createTextNode(textValue);

      const scriptElement = document.createElement('script');
      scriptElement.src = `your-script-file-${id}.js`;

      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
      div.appendChild(textNode);

      setScriptSrc(scriptElement.src);
      console.log(`Script source id ${id}: ${scriptElement.src}`);
      document.head.appendChild(scriptElement);
    });
  }, []);

  function handleDivClick(event) {
    const div = event.currentTarget;
    const id = div.getAttribute('attribute-gallery');
    const textValue = `ID : ${id} - Hello`;

    const scriptElement = document.createElement('script');
    scriptElement.src = `your-script-file-${id}.js`;

    const existingScript = document.querySelector(`[src="your-script-file-${id}.js"]`);
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(scriptElement);

    const clonedScript = scriptElement.cloneNode(true);
    setScriptSrc(scriptElement.src);
    console.log(scriptElement.src, 'script');
    document.body.appendChild(clonedScript);
  }

  return (
    <>
      <div attribute-gallery="1" onClick={handleDivClick} />
      <script src={scriptSrc} />

      <div attribute-gallery="2" onClick={handleDivClick} />
      <script src={scriptSrc} />

      <div attribute-gallery="3" onClick={handleDivClick} />
      <script src={scriptSrc} />
    </>
  );
}

export default Dynamicfile;

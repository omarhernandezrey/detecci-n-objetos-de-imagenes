import React, { useState, useEffect } from 'react';

const ClassifierComponent = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [results, setResults] = useState('');
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    // Esta función se llama cuando el modelo se supone que está listo.
    const handleModelReady = () => {
      // Si la función de clasificación está disponible, cambia el estado a listo.
      if (typeof window.runImpulse === 'function') {
        console.log('Model is now ready.');
        setModelReady(true);
      } else {
        console.error('La función de clasificación no está disponible.');
      }
    };

    // Escuchar el evento custom 'modelReady' que se emite desde _app.js
    document.addEventListener('modelReady', handleModelReady);

    // Limpieza: remover el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('modelReady', handleModelReady);
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleClassify = () => {
    // Aquí, asegúrate de que window.runImpulse pueda manejar la data en la forma en que se le está pasando.
    if (modelReady && window.runImpulse) {
      // El argumento debe ser una imagen o datos de imagen que tu modelo pueda procesar.
      // Puede que necesites convertir imageSrc a otro formato o pasar un elemento HTMLImageElement.
      window.runImpulse(imageSrc, (error, result) => {
        if (error) {
          console.error('Error running model:', error);
        } else {
          setResults(result);
          console.log('Classification result:', result);
        }
      });
    } else {
      console.log('Model not loaded yet or function not available.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt="Uploaded for classification"
          onLoad={handleClassify} // Llama a la clasificación cuando la imagen esté cargada
        />
      )}
      <button onClick={handleClassify} disabled={!modelReady}>Classify Image</button>
      {results && <p>Classification Results: {JSON.stringify(results)}</p>}
    </div>
  );
};

export default ClassifierComponent;

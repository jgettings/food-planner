import React, { useState } from 'react';
import AddButton from './AddButton';
import ImportUrlDialog from './ImportUrlDialog';
import EditDialog from './EditDialog';

const RecipeEditor = () => {
  const [currentStep, setStep] = useState(0);
  const [url, setUrl] = useState('');

  return (
    <div>
      <AddButton start={() => setStep(1)} />
      <ImportUrlDialog
        open={currentStep > 0}
        cancel={() => setStep(0)}
        next={(u) => { setUrl(u); setStep(2); }}
      />
      <EditDialog
        open={currentStep === 2}
        url={url}
        cancel={() => setStep(0)}
        next={() => setStep(0)}
      />
    </div>
  );
};

// TODO make this into a Speed Dial thing with the option to add manually instead of from URL

export default RecipeEditor;

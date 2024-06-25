import React, { useState } from 'react';

const FAQ = () => {
  const [faq, setFaq] = useState([
    {
      question: 'سوال 1',
      answer: 'پاسخ 1'
    },
    {
      question: 'سوال 2',
      answer: 'پاسخ 2'
    }
  ]);

  const handleAddFAQ = () => {
    const newFAQItem = {
      question: '',
      answer: ''
    };
    setFaq([...faq, newFAQItem]);
  };

  const handleQuestionChange = (index, event) => {
    const updatedFAQ = [...faq];
    updatedFAQ[index].question = event.target.value;
    setFaq(updatedFAQ);
  };

  const handleAnswerChange = (index, event) => {
    const updatedFAQ = [...faq];
    updatedFAQ[index].answer = event.target.value;
    setFaq(updatedFAQ);
  };

  const handleRemoveFAQ = (index) => {
    const updatedFAQ = [...faq];
    updatedFAQ.splice(index, 1);
    setFaq(updatedFAQ);
  };

  return (
    <div className="faq-container">
      {faq.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question">
            <label htmlFor={`question-${index}`}>سوال:</label>
            <input
              id={`question-${index}`}
              type="text"
              value={item.question}
              onChange={(event) => handleQuestionChange(index, event)}
            />
          </div>
          <div className="faq-answer">
            <label htmlFor={`answer-${index}`}>پاسخ:</label>
            <textarea
              id={`answer-${index}`}
              value={item.answer}
              onChange={(event) => handleAnswerChange(index, event)}
            />
          </div>
          <button onClick={() => handleRemoveFAQ(index)}>حذف</button>
        </div>
      ))}
      <button onClick={handleAddFAQ}>افزودن سوال جدید</button>
    </div>
  );
};

export default FAQ
"use server";

export const sendMessageToGemini = async (userInput) => {
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB0UUL-dn5odqb_7X10RgYhWwROcaADUM0';
  
  const requestPayload = {
    contents: [
      {
        parts: [
          { text: userInput }
        ]
      }
    ]
  };

  console.log(requestPayload);
  
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response');
    }

    const data = await response.json();
    return data?.candidates[0]?.content.parts[0]?.text || 'No response from Gemini';
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    return 'Sorry, there was an error processing your request.';
  }
};

from unittest import result
from transformers import BertTokenizer, TFBertForMaskedLM
import tensorflow as tf

#Text, string 
#K is the number of predictions
def predictToken(text,k):
    #The tokenizer is responsible for all the preprocessing the pretrained model expects
    #The tokenizer takes care of splitting the sequence into tokens available in the tokenizer vocabulary.
    #tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
    #model = TFBertForMaskedLM.from_pretrained("bert-base-cased")
    
    #Model, a TensorFlow tf.keras.Model
    tokenizer = BertTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased')
    model = TFBertForMaskedLM.from_pretrained("neuralmind/bert-base-portuguese-cased")

    #Text to tokens and then convert into IDs
    encoded_input = tokenizer(text,return_tensors='tf')
    logits = model(**encoded_input).logits
    
    # retrieve index of [MASK]
    mask_token_index = tf.where((encoded_input.input_ids == tokenizer.mask_token_id)[0])
    selected_logits = tf.gather_nd(logits[0], indices=mask_token_index)

    #predicted_token_id = tf.math.argmax(selected_logits, axis=-1) ##return max
    list_predicted_token_id = tf.nn.top_k(selected_logits, k) ##return K maxs results

    predictions = []
    for i in range(0,k):
        aux = []
        aux.append(list_predicted_token_id[1][0][i]);
        predictions.append(tokenizer.decode(aux,clean_up_tokenization_spaces=True))
        print(f"PREVISÕES: {predictions[i]}   {list_predicted_token_id[1][0]}")
    return predictions

if __name__ == "__main__":
    while 1:
        print("Digite uma sentença:")
        text = input()
       
        resultText = predictToken(text, 5)

        print("Resultado:")
        print(resultText)

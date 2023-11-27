import React, {useState} from 'react';
import {View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default function SelectPicture() {
  const [photo, setPhoto] = useState({});
    const handleChoosePhoto = () => {
      const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          setPhoto(source);
        }
      });
    };
      return (
      <View
          style={{
            margin: 5,
          }}>
        {photo && (
            <Image source={photo} style={{width: 300, height: 300}} />
        )}
        <Button title="Choose Photo" onPress={handleChoosePhoto} />
      </View>
  );
}

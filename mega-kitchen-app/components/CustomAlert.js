import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Colors } from './styles';

const CustomAlert = ({ visible, type, title, message, onConfirm, onCancel, onOk }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      {type === 'confirm' && (
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.messageText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === 'warning' && (
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.messageText}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={onOk}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Modal>
  );
};

const { primary, darkLight, lightBrand, brand, transparent } = Colors;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    backgroundColor: brand,
    borderRadius: 10,
    padding: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: transparent,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: transparent,
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default CustomAlert;

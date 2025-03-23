<template>
    <div class="image-cropper">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="onFileChange"
        style="display: none"
      />
      
      <button v-if="!imageSource" @click="triggerFileInput" class="upload-button">
        Upload Photo
      </button>
  
      <div v-if="imageSource" class="cropper-container">
        <cropper
          ref="cropper"
          :src="imageSource"
          :stencil-props="{
            aspectRatio: 1/1
          }"
          :resize-image="{
            adjustStencil: false
          }"
          @change="handleChange"
        />
  
        <div class="action-buttons">
          <button @click="cancelCrop" class="cancel-button">Cancel</button>
          <button @click="cropImage" class="crop-button">Crop</button>
        </div>
      </div>
  
      <div v-if="croppedImage" class="preview-container">
        <img :src="croppedImage" alt="Cropped Preview" class="preview-image" />
        <button @click="editImage" class="edit-button">Edit Again</button>
      </div>
    </div>
  </template>
  
  <script>
  import { Cropper } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'
  
  export default {
    components: {
      Cropper
    },
    data() {
      return {
        imageSource: null,
        croppedImage: null,
        coordinates: null
      }
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click()
      },
      onFileChange(event) {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.imageSource = e.target.result
            this.croppedImage = null
          }
          reader.readAsDataURL(file)
        }
      },
      handleChange({ coordinates }) {
        this.coordinates = coordinates
      },
      async cropImage() {
        const { coordinates } = this
        const canvas = this.$refs.cropper.getCanvas()
        
        if (canvas) {
          const croppedImage = canvas.toDataURL()
          this.croppedImage = croppedImage
          this.imageSource = null
          
          // Emit the cropped image blob
          const blob = await new Promise(resolve => canvas.toBlob(resolve))
          this.$emit('cropped', blob)
        }
      },
      cancelCrop() {
        this.imageSource = null
        this.$refs.fileInput.value = ''
      },
      editImage() {
        this.imageSource = this.croppedImage
        this.croppedImage = null
      }
    }
  }
  </script>
  
  <style scoped>
  .image-cropper {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .cropper-container {
    margin: 20px 0;
  }
  
  .preview-container {
    text-align: center;
    margin-top: 20px;
  }
  
  .preview-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }
  
  button {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .upload-button {
    background: #007bff;
    color: white;
  }
  
  .crop-button {
    background: #28a745;
    color: white;
  }
  
  .cancel-button {
    background: #dc3545;
    color: white;
  }
  
  .edit-button {
    background: #17a2b8;
    color: white;
  }
  </style>
<template>
  <div class="image-cropper">
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
    />
    
    <!-- PrimeVue Button for triggering file input -->
    

    <div v-if="imageSource" class="cropper-container">
      <cropper
        ref="cropper"
        :src="imageSource"
        :stencil-props="{ aspectRatio: 1/1 }"
        :resize-image="{ adjustStencil: false }"
        @change="handleChange"
      />
  
      <div class="action-buttons">
        <!-- PrimeVue Buttons for Cancel and Crop actions -->
        <Button @click="cancelCrop" label="Cancel" class="cancel-button" />
        <Button @click="cropImage" label="Crop" class="crop-button" />
      </div>
    </div>
  
    <div v-if="croppedImage" class="preview-container">
      <img :src="croppedImage" alt="Cropped Preview" class="preview-image" />
      <!-- PrimeVue Button for editing image -->
      <Button @click="editImage" label="Edit Again" class="edit-button" />
    </div>
    <Button
      v-if="!imageSource"
      @click="triggerFileInput"
      label="Upload Photo"
      class="upload-button"
    />
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Button from 'primevue/button'

export default {
  components: {
    Cropper,
    Button,
  },
  data() {
    return {
      imageSource: null,
      croppedImage: null,
      coordinates: null,
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cropper-container {
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
}

@media (max-width: 600px) {
  .cropper-container {
    max-width: 100%;
    padding: 0 10px; /* add some horizontal padding if desired */
  }
}


.preview-container {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

/* PrimeVue Button customization (if needed) */
.upload-button,
.crop-button,
.cancel-button,
.edit-button {
  padding: 8px 20px;
  font-size: 14px;
}
</style>

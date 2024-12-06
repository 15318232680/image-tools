export class ImageCompress {
    static async init() {
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        const previewArea = document.getElementById('previewArea');
        const originalPreview = document.getElementById('originalPreview');
        const compressedPreview = document.getElementById('compressedPreview');
        const originalSize = document.getElementById('originalSize');
        const compressedSize = document.getElementById('compressedSize');
        const qualitySlider = document.getElementById('quality');
        const qualityValue = document.getElementById('qualityValue');
        const downloadBtn = document.getElementById('downloadBtn');

        let originalImage = null;

        // 上传区域点击事件
        uploadArea.addEventListener('click', () => {
            imageInput.click();
        });

        // 拖放功能
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#007AFF';
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#E5E5E5';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#E5E5E5';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImageUpload(file);
            }
        });

        // 文件选择处理
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImageUpload(file);
                imageInput.value = '';
            }
        });

        // 质量滑块事件
        qualitySlider.addEventListener('input', (e) => {
            qualityValue.textContent = `${e.target.value}%`;
            if (originalImage) {
                compressImage(originalImage, e.target.value / 100);
            }
        });

        function handleImageUpload(file) {
            originalImage = file;
            const reader = new FileReader();
            
            reader.onload = (e) => {
                originalPreview.src = e.target.result;
                originalSize.textContent = formatFileSize(file.size);
                previewArea.hidden = false;
                compressImage(file, qualitySlider.value / 100);
            };

            reader.readAsDataURL(file);
        }

        function compressImage(file, quality) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;
                
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1080;
                
                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }
                if (height > MAX_HEIGHT) {
                    width = Math.round((width * MAX_HEIGHT) / height);
                    height = MAX_HEIGHT;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                
                canvas.toBlob(
                    (blob) => {
                        if (blob.size >= file.size) {
                            compressedPreview.src = URL.createObjectURL(file);
                            compressedSize.textContent = formatFileSize(file.size);
                            downloadBtn.onclick = () => {
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(file);
                                link.download = originalImage.name;
                                link.click();
                            };
                        } else {
                            compressedPreview.src = URL.createObjectURL(blob);
                            compressedSize.textContent = formatFileSize(blob.size);
                            downloadBtn.onclick = () => {
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = `compressed_${originalImage.name}`;
                                link.click();
                            };
                        }
                    },
                    outputType,
                    quality
                );
            };
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }

    static async unload() {
        // 清理代码
    }
} 
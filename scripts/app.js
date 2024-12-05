document.addEventListener('DOMContentLoaded', () => {
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
        if (!imageInput.files.length) {
            imageInput.click();
        }
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
            resetBtn.style.display = 'block';
        }
    });

    // 质量滑块事件
    qualitySlider.addEventListener('input', (e) => {
        qualityValue.textContent = `${e.target.value}%`;
        if (originalImage) {
            compressImage(originalImage, e.target.value / 100);
        }
    });

    // 处理图片上传
    function handleImageUpload(file) {
        originalImage = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            document.body.classList.add('has-image');
            
            originalPreview.src = e.target.result;
            originalSize.textContent = formatFileSize(file.size);
            previewArea.hidden = false;
            compressImage(file, qualitySlider.value / 100);
        };

        reader.readAsDataURL(file);
    }

    // 压缩图片
    function compressImage(file, quality) {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 计算新的尺寸
            let width = img.width;
            let height = img.height;
            
            // 如果图片太大，按比例缩小
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

            // 绘制图片
            ctx.fillStyle = 'white'; // 设置白色背景
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // 根据原始图片类型选择输出格式
            const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
            
            canvas.toBlob(
                (blob) => {
                    // 如果压缩后的大小反而变大，则使用原图
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

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 添加重置功能
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-btn';
    resetBtn.innerHTML = '重新选择';
    resetBtn.style.display = 'none';
    uploadArea.appendChild(resetBtn);

    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        imageInput.value = '';
        previewArea.hidden = true;
        document.body.classList.remove('has-image');
        resetBtn.style.display = 'none';
        originalPreview.src = '';
        compressedPreview.src = '';
    });

    // 添加重置按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .reset-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.3rem 0.8rem;
            background: #f0f0f0;
            border: none;
            border-radius: 4px;
            font-size: 0.8rem;
            color: #666;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .reset-btn:hover {
            background: #e0e0e0;
        }
        .upload-area {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}); 
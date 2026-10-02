import React, { useRef, useState } from 'react';
import { Upload, Link2, Sparkles, Image as ImageIcon, X, Check, RefreshCw, Zap } from 'lucide-react';
import { extractYouTubeVideoId, generateYouTubeThumbnail } from '../utils/storage';
import { compressThumbnailImage, CompressionResult } from '../utils/imageCompressor';

interface ThumbnailUploaderProps {
  idPrefix: string;
  value: string;
  onChange: (thumb: string) => void;
  videoUrl?: string;
  onNotify?: (message: string) => void;
}

export function ThumbnailUploader({
  idPrefix,
  value,
  onChange,
  videoUrl = '',
  onNotify,
}: ThumbnailUploaderProps) {
  const [tab, setTab] = useState<'url' | 'file'>('file');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionStats, setCompressionStats] = useState<CompressionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      onNotify?.('이미지 파일(PNG, JPG, WebP)만 업로드할 수 있습니다.');
      return;
    }

    setIsProcessing(true);
    try {
      // Automatically compress and resize to optimal 16:9 thumbnail (960x540, ~30KB - 50KB)
      // This prevents document size limit exceptions in Firestore and LocalStorage quota errors
      const result = await compressThumbnailImage(file, 960, 540, 0.82);
      setCompressionStats(result);
      onChange(result.dataUrl);
      onNotify?.(`✨ 썸네일 고화질 최적화 완료! (${result.originalSizeKb}KB → ${result.compressedSizeKb}KB, 배포 후에도 안전 영구 보존)`);
    } catch (err: any) {
      console.error('Image compression error:', err);
      // Fallback to direct read if canvas fails
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          onChange(dataUrl);
          onNotify?.('썸네일 이미지가 등록되었습니다.');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleAutoExtract = () => {
    if (!videoUrl) {
      onNotify?.('유튜브 영상 URL을 먼저 입력해주세요.');
      return;
    }
    const thumb = generateYouTubeThumbnail(videoUrl);
    if (thumb) {
      setCompressionStats(null);
      onChange(thumb);
      onNotify?.('유튜브 고화질 썸네일을 자동으로 불러왔습니다!');
    } else {
      onNotify?.('유효한 유튜브 영상 링크를 찾지 못했습니다.');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-900 text-xs">
          썸네일 이미지 <span className="text-red-500">*</span>
        </label>
        {videoUrl && (
          <button
            type="button"
            onClick={handleAutoExtract}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>유튜브 자동 추출</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => setTab('file')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            tab === 'file'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>내 PC 파일 업로드 (자동 압축 최적화)</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            tab === 'url'
              ? 'bg-white text-purple-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>URL 링크 입력</span>
        </button>
      </div>

      {/* Mode 1: File upload dropzone (Default) */}
      {tab === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            id={`${idPrefix}-thumbnail-file`}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-purple-500 bg-purple-50/50'
                : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-600">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </div>
              <p className="font-semibold text-slate-800 text-xs">
                {isProcessing ? '고화질 최적화 압축 중...' : '클릭하여 이미지 선택 또는 파일을 드래그앤드롭'}
              </p>
              <p className="text-[10px] text-slate-400">
                PNG, JPG, WebP (배포 후에도 깨지지 않도록 자동 고화질 최적화 보존됩니다)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: URL input */}
      {tab === 'url' && (
        <div className="relative">
          <input
            id={`${idPrefix}-thumbnail-url`}
            type="text"
            required
            placeholder="https://... 또는 유튜브 썸네일 주소"
            value={value}
            onChange={(e) => {
              setCompressionStats(null);
              onChange(e.target.value);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 pr-10"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title="지우기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Preview */}
      {value ? (
        <div className="mt-2 flex items-start gap-3 p-2.5 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="w-28 sm:w-36 aspect-video rounded-lg overflow-hidden bg-slate-200 shrink-0 relative border border-slate-300 shadow-xs">
            <img
              src={value}
              alt="썸네일 미리보기"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const fb = videoUrl ? generateYouTubeThumbnail(videoUrl) : '';
                (e.currentTarget as HTMLImageElement).src = fb || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" />
                  미리보기 확인 완료
                </span>
                {compressionStats && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    <Zap className="w-3 h-3" />
                    최적화 {compressionStats.originalSizeKb}KB → {compressionStats.compressedSizeKb}KB
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 truncate font-mono">
                {value.startsWith('data:') ? '클라우드 안전 최적화 이미지' : value}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  setCompressionStats(null);
                  onChange('');
                }}
                className="text-[11px] text-red-600 hover:text-red-700 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>썸네일 삭제</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
          <ImageIcon className="w-3 h-3 text-slate-400" />
          <span>썸네일 이미지를 등록하면 유튜브 섹션 카드에 노출됩니다.</span>
        </p>
      )}
    </div>
  );
}

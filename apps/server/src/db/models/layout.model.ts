import { Schema, model, Document } from 'mongoose';

export interface ILayout extends Document {
  name: string;
  slug: string;
  description?: string;
  template: any; // JSON or HTML template descriptor used by frontend
  previewImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const layoutSchema = new Schema<ILayout>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    template: { type: Schema.Types.Mixed, default: {} },
    previewImage: { type: String },
  },
  { timestamps: true },
);

// layoutSchema.index({ slug: 1 });

export const Layout = model<ILayout>('Layout', layoutSchema);

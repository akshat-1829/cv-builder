import { Schema, model, Document, Types } from 'mongoose';

export interface ICV extends Document {
  user: Types.ObjectId;
  title: string;
  layout: string;
  data: any; // structured CV data (basic, education, experience, projects, skills, socials)
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cvSchema = new Schema<ICV>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    layout: { type: String, required: true, default: 'default' },
    data: { type: Schema.Types.Mixed, default: {} },
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true },
);

cvSchema.index({ user: 1 });

export const CV = model<ICV>('CV', cvSchema);

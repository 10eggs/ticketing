import { Subjects, Publisher, ExpirationCompleteEvent } from '@supafellas/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}



